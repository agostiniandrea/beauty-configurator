import { useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';

export const appHistory = useRouterHistory(createHashHistory)(/* { queryKey: false } */);

