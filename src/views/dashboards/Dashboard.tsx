import { Link } from 'react-router';


const Dashboard = () => {
  return (
    <div className="grid grid-cols-12 gap-30">
      <div className="lg:col-span-12 col-span-12">
        <div className="grid lg:grid-cols-12 grid-cols-4 gap-4">
          <div className="col-span-4">
          <div className="col-span-4">
            <div className="text-2xl font-bold">Waktu Penggunaan Total</div>
            <div className="text-sm text-gray-500">00:00:00</div>
          </div>
          <div className="col-span-4">
            <div className="text-2xl font-bold">Biaya Total</div>
            <div className="text-sm text-gray-500">Rp.0</div>
          </div>
          <div className="col-span-4">
            <div className="text-2xl font-bold">Status Pompa</div>
            <div className="text-sm text-gray-500">On</div>
          </div>
          <div className="col-span-4">
            <div className="text-2xl font-bold">Biaya Sewa per Jam</div>
            <div className="text-sm text-gray-500">Rp.5000</div>
          </div>
        </div>
      </div>
      <div className="lg:col-span-12 col-span-12">
        <div className="text-2xl font-bold">Revenue Forecast</div>
      </div>
      <div className="lg:col-span-8 col-span-12">
        <div className="text-2xl font-bold">Product Revenue</div>
      </div>
      <div className="lg:col-span-4 col-span-12 flex">
        <div className="text-2xl font-bold">Daily Activity</div>
      </div>
      <div className="col-span-12">
        <div className="text-2xl font-bold"></div>Blog Cards</div>
      </div>
      <div className="flex justify-center align-middle gap-2 flex-wrap col-span-12 text-center">
        <p className="text-base">
          Design and Developed by{' '}
          <Link
            to="https://adminmart.com/"
            target="_blank"
            className="pl-1 text-primary underline decoration-primary"
          >
            adminmart.com
          </Link>
        </p>
        <p className="text-base">
          Distributed by
          <Link
            to="https://themewagon.com/"
            target="_blank"
            className="pl-1 text-primary underline decoration-primary"
          >
            ThemeWagon
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
