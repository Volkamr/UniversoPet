import React from "react";
import { createContext } from "react";
import { useState } from "react";
import Rec_cont from "./rec_cont";
import Cod_otp from "./ingresar_codigo/cod_otp";
import Confirmar from "./confirmar_nueva/confirmar_nueva";
import Reboot from "./cambiada_exito/reboot";

export const RecoveryContext = createContext();

function Main_recuperar() {
    const [page, setPage] = useState('rec_cont');
    const [email, setEmail] = useState();
    const [otp, setOTP] = useState();

    function NavigateComponents() {
        if (page === "rec_cont") return <Rec_cont />;
        if (page === "otp") return <Cod_otp />;
        if (page === "confirmar_nueva") return <Confirmar />;
        return <Reboot />;
    }

    return (
        <RecoveryContext.Provider value={{ page, setPage, otp, setOTP, email, setEmail }}>
            <NavigateComponents />
        </RecoveryContext.Provider>
    );
}

export default Main_recuperar;


