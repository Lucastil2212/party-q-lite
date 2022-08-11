import React, { createContext, useState } from "react";

export type UserType =
  | {
      name: string;
      id: string;
      followers: number;
      imageUrl: string;
    }
  | undefined;

interface IUserContext {
  accessToken: string;
  setAccessToken?: (value: string) => void;
  user?: UserType;
  setUser?: (value: UserType) => void;
}

const initialState = {
  accessToken: "",
};

export const UserContext = createContext<IUserContext>(initialState);
