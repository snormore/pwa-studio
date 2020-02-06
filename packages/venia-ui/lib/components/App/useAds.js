import React, { useState, useEffect } from 'react';

import { GenerateAdsSyncBailHook } from '../../tapableHooks';

const useAds = () => {
    const [GeneratedAd, setGeneratedAd] = useState(<div />);

    useEffect(() => {
        setTimeout(() => {
            GenerateAdsSyncBailHook.call(setGeneratedAd, {
                interest: 'Football'
            });
        }, 0);
    }, []);

    return [GeneratedAd];
};

export default useAds;
