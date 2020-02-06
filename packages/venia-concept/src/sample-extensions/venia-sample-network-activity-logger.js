function networkLogger(isOnline) {
    if (isOnline) {
        const onlineAt = Date.now();
        const offlineAt = localStorage.getItem('offlineAt');

        localStorage.setItem('onlineAt', onlineAt);

        console.log('Back online after', onlineAt - offlineAt, 'ms');
    } else {
        localStorage.setItem('offlineAt', Date.now());
    }
}

export default tapableHooks => {
    const { networkActivitySyncHook } = tapableHooks;

    networkActivitySyncHook.tap(
        'venia-sample-network-activity-logger',
        networkLogger
    );
};
