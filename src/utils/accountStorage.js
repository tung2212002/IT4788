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
    let accounts = await getAccounstStorage();

    if (!accounts) {
        // If no accounts exist, store the new account as an array
        await Storage.storeObjectItem('accounts', [data]);
        return;
    }

    let accountIndex = -1;

    // Find the index of the account with the same email
    accounts.forEach((account, index) => {
        if (account.email === data.email) {
            accountIndex = index;
        }
    });

    if (accountIndex !== -1) {
        accounts[accountIndex] = data;
    } else {
        accounts.push(data);
    }

    if (accounts.length > 2) {
        accounts.shift();
    }

    await Storage.storeObjectItem('accounts', accounts);
};

export { getAccounstStorage, removeAccountStorage, setAccountsStorage };
