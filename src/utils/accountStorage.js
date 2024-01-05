import * as Storage from './asyncStorageUtils';

const getAccounstStorage = async () => {
    const user = await Storage.getObjectItem('accounts');
    return user;
};

const removeAccountStorage = async (email) => {
    try {
        const accounts = await getAccounstStorage();
        const newAccounts = accounts.filter((account) => account.email !== email);
        await Storage.storeObjectItem('accounts', newAccounts);
        return newAccounts;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const setAccountsStorage = async (data) => {
    const accounts = await getAccounstStorage();
    if (!accounts) {
        await Storage.storeObjectItem('accounts', [data]);
        return;
    }
    accounts.map(async (account) => {
        if (account.email === data.email) {
            accounts.shift(account);
            accounts.push(data);
            await Storage.storeObjectItem('accounts', accounts);
            return;
        }
    });
    if (accounts.length === 2) {
        accounts.shift();
    }
    accounts.push(data);
    await Storage.storeObjectItem('accounts', accounts);
};

export { getAccounstStorage, removeAccountStorage, setAccountsStorage };
