import styles from '../css/Main.module.css';
import { Routes, Route } from 'react-router-dom'; // 👈 1. Import Routes and Route
import NewEmployeeOnboarding from "../components/Header/EmployeeOnBoarding-container/EmployeeOnBoarding-container/EmployeeOnBoardingContainer"

const Main = () => {
    return (
        <div className={styles.layout}>
            <header className={styles.header}>
                {/* Your global header content */}
            </header>
            <div className={styles.container}>
                <aside className={styles.sidebar}>
                    {/* Your sidebar navigation */}
                </aside>
                <main className={styles.content}>
                    {/* The .top div is now rendered *inside* NewEmployeeOnboarding, so we remove it from here. */}
                    {/* The .bottom div will now hold all your content routes. */}
                    <div className={styles.bottom}>
                        {/* 3. Define the routes for your main content area */}
                        <Routes>
                            {/* This route path must end in /* to allow nested routes */}
                            <Route path="/new-employee-onboarding/*" element={<NewEmployeeOnboarding />} />
                            
                            {/* Add other routes for your main content here */}
                            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
                        </Routes>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Main;