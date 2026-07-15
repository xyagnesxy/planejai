import { createBrowserRouter } from "react-router";
import { SimulationFormPage } from "./pages/SimulationFormPage";
import { RootLayout } from "./components/layout/RootLayout";
import { SimulationResultsPage } from "./pages/SimulationResultsPage";
import { SimulationHistoryPage } from "./pages/SimulationHistoryPage";

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
                element:<SimulationHistoryPage/>,
            },

        ]
    }
])