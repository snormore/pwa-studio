export default tapableHooks => {
    const { networkActivityParallelHook } = tapableHooks;

    networkActivityParallelHook.tap(
        'venia-sample-network-activity-logger',
        isOnline => {
            if (isOnline) {
                const onlineAt = Date.now();
                const offlineAt = localStorage.getItem('offlineAt');

                localStorage.setItem('onlineAt', onlineAt);

                console.log('Back online after', onlineAt - offlineAt, 'ms');
            } else {
                localStorage.setItem('offlineAt', Date.now());
            }
        }
    );
};
