import { Outlet } from 'react-router-dom';
import Header from './Header';
import { OnlineGuard } from './OnlineGuard';

const PrivateLayout = () => {
  return (
    <OnlineGuard>
      <div className="flex h-screen bg-gray-100">
        <Header />

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white shadow">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center">
                <span className="ml-2 font-medium">John Doe</span>
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-4">
            <div className="container mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </OnlineGuard>
  );
};

export default PrivateLayout;
