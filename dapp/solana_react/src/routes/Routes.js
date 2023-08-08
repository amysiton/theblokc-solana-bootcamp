import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PostDashboard } from "../pages/PostDashboard";

export const Router = () => {
    return (
        <div id="app">
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<PostDashboard/>} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}