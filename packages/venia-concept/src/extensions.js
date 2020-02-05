const extensions = ['online-offline-extension'];

export const registerTapableHooks = tapableHooks => {
    return Promise.all(
        extensions.map(extension => {
            return import(extension).then(registerHooks => {
                registerHooks(tapableHooks);
            });
        })
    );
};

export default extensions;
