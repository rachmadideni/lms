'use client';

import { RecoilRoot } from 'recoil';

interface IRecoilProvider {
  children: React.ReactNode;
}

const RecoilProvider = ({ children }: IRecoilProvider) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};

export default RecoilProvider;
