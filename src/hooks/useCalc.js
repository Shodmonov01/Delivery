import { create } from "zustand"
import { v4 as uuidv4 } from "uuid";

// Function to get initial state from localStorage or use defaults
const getInitialState = () => {
    const savedState = localStorage.getItem("calcStore");
    return savedState
        ? JSON.parse(savedState)
        : {
            id: uuidv4(),
            name: "snelle levering",
            count: 1,
            length: "",
            width: "",
            height: "",
            weight: "",
            is_transport: true,
            is_cargo: false,
            cargo: "",
            km: "",
            price_km: 0,
            startCity: "",
            endCity: "",
            st: null,
            st2: null,
        };
}

export const useCalc = create((set) => ({
    ...getInitialState(),
    setCalcData: (data) => {
        set((state) => {
            const newState = { ...state, ...data };
            localStorage.setItem("calcStore", JSON.stringify(newState));
            return newState;
        });
    },
    resetData: () => {
        const resetState = {
            id: null,
            name: "snelle levering",
            count: 1,
            length: "",
            width: "",
            height: "",
            weight: "",
            is_transport: true,
            is_cargo: false,
            cargo: "",
            km: "",
            price_km: 0,
            oldStartCity: "",
            oldEndCity: "",
            oldSt: null,
            oldSt2: null,
        };
        localStorage.setItem("calcStore", JSON.stringify(resetState));
        set(resetState);
    }
}));
