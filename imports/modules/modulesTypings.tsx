import React from 'react';

export interface IAppMenu {
    path?: string;
    name?: string;
    isProtected?: boolean;
    icon?: any;
}
export interface IRoute {
    path: string;
    component: any;
    isProtected?: boolean;
    exact?: string | boolean | undefined;
    resources?: string[];
}
export interface IModules {
    modulesRouterList: (IRoute | null)[];
    modulesAppMenuItemList: (IAppMenu | null)[];
}
