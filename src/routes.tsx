import { createBrowserRouter } from "react-router";
import { SimulationFormPage } from "./pages/SimulationFormPage";
import { RootLayout } from "./components/layout/RootLayout";
import { SimulationResultsPage } from "./pages/SimulationResultsPage";

export const router = createBrowserRouter([
    {
        path:"/",
        element:<RootLayout/>,
        children:[
            {
                path:"/",
                element: <SimulationFormPage/>
            },
            {
                path:"/resultado/:id",
                element:<SimulationResultsPage/>,
            },
            {
                path:"/historico",
                element:<h1>sdaas</h1>,
            },

        ]
    }
])