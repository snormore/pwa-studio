/**
 * Assume this is running on a worker thread.
 */

function recordSignoutDetails(data) {
    console.log('From extension', data);
}

export default function(tapableHooks) {
    const { SignoutAsyncParallelHook } = tapableHooks;

    SignoutAsyncParallelHook.tap(
        'venia-analytics-extension',
        singoutDetails => {
            recordSignoutDetails(singoutDetails);

            console.log(prepareAnalyticsData());
        }
    );
}
