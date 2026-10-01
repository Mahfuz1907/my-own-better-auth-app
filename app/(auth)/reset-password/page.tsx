import React, { Suspense } from 'react';
import ResetPage from './ResetPage';

const ResetPasswordPage = () => {
    return (
        <div className="mx-auto my-20">
            <Suspense>
                <ResetPage />
            </Suspense>
        </div>
    );
};

export default ResetPasswordPage;