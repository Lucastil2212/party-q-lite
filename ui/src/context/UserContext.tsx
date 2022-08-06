import React, { createContext, useState } from "react";

interface IUserContext {
  accessToken: string;
  setAccessToken?: (value: string) => void;
}

const initialState = {
  accessToken: "",
};

export const UserContext = createContext<IUserContext>(initialState);
