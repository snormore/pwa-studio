import React from 'react';

export function Ad({ interest }) {
    return (
        <div
            style={{
                position: 'fixed',
                display: 'flex',

                zIndex: '6',

                bottom: '0px',
                marginBottom: '1rem',

                minWidth: '100%'
            }}
        >
            <div
                style={{
                    border: '1px solid grey',
                    flex: '0.33',
                    padding: '5rem',
                    minHeight: '125px'
                }}
            >
                <span>{`${interest} Advertisment 1`}</span>
            </div>
            <div
                style={{
                    border: '1px solid grey',
                    flex: '0.33',
                    padding: '5rem',
                    minHeight: '125px'
                }}
            >
                <span>{`${interest} Advertisment 2`}</span>
            </div>
            <div
                style={{
                    border: '1px solid grey',
                    flex: '0.33',
                    padding: '5rem',
                    minHeight: '125px'
                }}
            >
                <span>{`${interest} Advertisment 3`}</span>
            </div>
        </div>
    );
}

export default function(tapableHooks) {
    const { GenerateAdsSyncBailHook } = tapableHooks;

    GenerateAdsSyncBailHook.tap('venia-ads-extension', (setComponent, data) => {
        setComponent(<Ad interest={data.interest} />);
        return;
    });
}
