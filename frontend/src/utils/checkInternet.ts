import * as Network from 'expo-network';

export const checkInternet = async (): Promise<boolean> => {
    try {

        const networkState = await Network.getNetworkStateAsync();

        return networkState.isConnected ?? false;

    } catch (error) {

        console.log('Internet check error:', error);

        return false;
    }
};