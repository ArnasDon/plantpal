import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-[url('/images/img-bg.png')] bg-cover bg-center bg-no-repeat">
      <div className="auth-layout bg-black/40">{children}</div>
    </div>
  );
};

export default AuthLayout;
