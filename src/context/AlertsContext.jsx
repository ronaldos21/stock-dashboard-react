import React, { createContext, useContext, useState } from "react";

const AlertsContext = createContext();

export const AlertsProvider = ({ children }) => {
    const [alerts, setAlerts] = useState({});

    const addAlert = (symbol, targetPrice) => {
        setAlerts((prev) => ({ ...prev, [symbol]: targetPrice }));
    };

    const removeAlert = (symbol) => {
        setAlerts((prev) => {
            const updated = { ...prev };
            delete updated[symbol];
            return updated;
        });
    };

    return (
        <AlertsContext.Provider value={{ alerts, addAlert, removeAlert }}>
            {children}
        </AlertsContext.Provider>
    );
};

export const useAlerts = () => useContext(AlertsContext);
