import { BrowserRouter, Navigate, useRoutes } from "react-router-dom";
import { MainLayout } from "./components/MainLayout";
import TodoListView from "./views/TodoList.view";

import {AView} from "./views/A.view";
import {BView} from "./views/B.view";
import {CView} from "./views/C.view";
import {DView} from "./views/D.view";

import { useEffect } from "react";
import "./App.css";
import { CreateCollectionView } from "./views/CreateCollection.view";
import { DCreateCollectionView } from "./views/D.CreateCollection.view";
import { MintView } from "./views/Mint.view";
import { TestView } from "./views/Test.view";
import { MyCollection } from "./views/MyCollection.view";
import { UploadedTraitsView } from "./views/UploadedTraits.view";

const Router = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { path: "create-collection", element: <CreateCollectionView /> },
        { path: "my-collection", element: <MyCollection /> },
        { path: "mint", element: <MintView /> },
        { path: "test", element: <TestView /> },
        { path: "A", element: <AView /> },
        { path: "B", element: <BView /> },
        { path: "C", element: <CView /> },
        { path: "D", element: <DView /> },
        { path: "DCreate-Collection", element: <DCreateCollectionView /> },
        { path: "DViewAllCollection", element: <DView /> },
        { path: "DViewMyCollection", element: <DView /> },
        { path: "DMint", element: <DView /> },
        {
          path: "todolist",
          element: <TodoListView />,
        },
        {
          path: "uploaded-traits",
          element: <UploadedTraitsView />,
        },
      ],
    },
  ]);

  return routes;
};

export const App = () => {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
};
