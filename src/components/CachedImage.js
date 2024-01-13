import React, { useEffect, useState, useRef } from 'react';
import { Image, ImageBackground } from 'react-native';
import * as FileSystem from 'expo-file-system';

const IMAGE_CACHE_FOLDER = `${FileSystem.cacheDirectory}`;

const CachedImage = (props) => {
    const { source, cacheKey, cacheFolder, placeholderContent, image, ...rest } = props;
    const { uri, headers, expiresIn } = source;
    let baseURIInfo;
    const getInfo = async () => {
        baseURIInfo = await FileSystem.getInfoAsync(`${IMAGE_CACHE_FOLDER}${cacheFolder || ''}`);
        if (!baseURIInfo.exists) {
            await FileSystem.makeDirectoryAsync(`${IMAGE_CACHE_FOLDER}${cacheFolder || ''}`, { intermediates: true });
        }
    };
    getInfo();

    const fileURI = `${IMAGE_CACHE_FOLDER}${cacheFolder || ''}/${cacheKey}`;

    const [imgUri, setImgUri] = useState(fileURI);

    const componentIsMounted = useRef(true);
    const requestOption = headers ? { headers } : undefined;

    const _callback = () => {
        if (!componentIsMounted.current) {
            downloadResumableRef.current.pauseAsync();
            FileSystem.deleteAsync(fileURI, { idempotent: true }); // delete file locally if it was not downloaded properly
        }
    };

    const downloadResumableRef = useRef(FileSystem.createDownloadResumable(uri, fileURI, requestOption, _callback));

    useEffect(() => {
        loadImageAsync();
        return () => {
            componentIsMounted.current = false;
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const loadImageAsync = async () => {
        try {
            // Use the cached image if it exists
            const metadata = await FileSystem.getInfoAsync(fileURI);
            let expired = false;
            if (metadata?.exists && expiresIn) {
                expired = new Date().getTime() / 1000 - metadata.modificationTime > expiresIn;
            }
            // const expired = metadata?.exists && expiresIn && new Date().getTime() / 1000 - metadata.modificationTime > expiresIn;
            if (!metadata?.exists || metadata?.size === 0 || expired) {
                if (componentIsMounted.current) {
                    setImgUri(null);

                    if (expired) {
                        await FileSystem.deleteAsync(fileURI, { idempotent: true });
                    }

                    // download to cache
                    const response = await downloadResumableRef.current.downloadAsync();
                    if (componentIsMounted.current && response?.status === 200) {
                        setImgUri(`${fileURI}?`); // deep clone to force re-render
                    }
                    if (response?.status !== 200) {
                        console.log('response not 200', response);
                        FileSystem.deleteAsync(fileURI, { idempotent: true }); // delete file locally if it was not downloaded properly
                    }
                }
            }
        } catch (err) {
            console.log('loadImageAsync', err);
            setImgUri(uri);
        }
    };

    if (!imgUri) {
        return placeholderContent || null;
    }

    return !image ? <ImageBackground source={{ uri: imgUri }} {...rest} /> : <Image source={{ uri: imgUri }} {...rest} />;
};

export const CacheManager = {
    addToCache: async ({ file, key }) => {
        await FileSystem.copyAsync({
            from: file,
            to: `${IMAGE_CACHE_FOLDER}${key}`,
        });
        return await CacheManager.getCachedUri({ key });
    },

    getCachedUri: async (key) => {
        return await FileSystem.getContentUriAsync(`${IMAGE_CACHE_FOLDER}${key}`);
    },

    getCacheInfo: async (key) => {
        console.log('getCacheInfo', `${IMAGE_CACHE_FOLDER}${key}`);
        console.log('getCacheInfo', await FileSystem.getInfoAsync(`${IMAGE_CACHE_FOLDER}${key}`));
        console.log('getCacheInfo', await FileSystem.readDirectoryAsync(`${IMAGE_CACHE_FOLDER}${key}`));
        return await FileSystem.getInfoAsync(`${IMAGE_CACHE_FOLDER}${key}`);
    },

    downloadAsync: async ({ uri, key, options }) => {
        return await FileSystem.downloadAsync(uri, `${IMAGE_CACHE_FOLDER}${key}`, options);
    },

    deleteCacheByKey: async (key) => {
        return await FileSystem.deleteAsync(`${IMAGE_CACHE_FOLDER}${key}`, { idempotent: true });
    },

    deleteAllFolders: async (folders) => {
        try {
            console.log('deleteAllFolders', folders);
            const folderInfo = await FileSystem.getInfoAsync(`${IMAGE_CACHE_FOLDER}${folders}`);
            console.log('deleteAllFolders', folderInfo);
            if (folderInfo.exists) {
                console.log('deleteAllFolders', folderInfo);
                // delete all files in folder
                const files = await FileSystem.readDirectoryAsync(`${IMAGE_CACHE_FOLDER}${folders}`);
                console.log('deleteAllFolders2', files);
                for (const file of files) {
                    await FileSystem.deleteAsync(`${IMAGE_CACHE_FOLDER}${folders}/${file}`, { idempotent: true });
                }
            }
        } catch (err) {
            console.log(err);
        }
    },
};

export default CachedImage;
