import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="auth-layout bg-[url('/images/img-bg.png')] bg-cover bg-center bg-no-repeat">
      {children}
    </div>
  );
};

export default AuthLayout;
