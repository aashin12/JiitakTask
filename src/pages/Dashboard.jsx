import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { FaChevronLeft, FaChevronRight, FaSearch, FaUserCircle } from "react-icons/fa";
import axios from "axios";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [userData, setUserData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const data = [
    { age: "10s", male: 100, female: 80, other: 10 },
    { age: "20s", male: 300, female: 240, other: 20 },
    { age: "30s", male: 400, female: 350, other: 30 },
    { age: "40s", male: 350, female: 300, other: 25 },
    { age: "50s", male: 200, female: 180, other: 15 },
    { age: "60s", male: 100, female: 80, other: 5 },
    { age: "70+", male: 50, female: 40, other: 2 },
  ];

  const cards = [
    {
      title: "Total Registered Users",
      period: "2024 Jan 1 - Jan 31",
      value: "450",
      unit: "Users",
      sub: "400 last month",
      change: "+12.5%",
      changeColor: "text-green-500",
      changeBg: "bg-green-100",
    },
    {
      title: "Active Users",
      period: "2024 Jan 1 - Jan 25",
      value: "50",
      unit: "/ month",
      sub: "12 last month",
      change: "+316.6%",
      changeColor: "text-green-500",
      changeBg: "bg-green-100",
    },
    {
      title: "Retention Rate",
      period: "2024 Jan 1 - Jan 31",
      value: "10",
      unit: "% / month",
      sub: "12% (previous month)",
      change: "↓16.6%",
      changeColor: "text-red-500",
      changeBg: "bg-red-100",
    },
    {
      title: "Avg. Usage Count",
      period: "2024 Jan 1 - Jan 25",
      value: "4",
      unit: "times / month",
      sub: "2 times (previous month)",
      change: "+100%",
      changeColor: "text-green-500",
      changeBg: "bg-green-100",
    },
    {
      title: "Usage Frequency",
      period: "2024 Jan 1 - Jan 25",
      value: "125",
      unit: "times / month",
      sub: "85 last month",
      change: "+47.1%",
      changeColor: "text-green-500",
      changeBg: "bg-green-100",
    },
    {
      title: "Deleted Accounts",
      period: "2024 Jan 1 - Jan 25",
      value: "10",
      unit: "/ month",
      sub: "8 last month",
      change: "+25%",
      changeColor: "text-green-500",
      changeBg: "bg-green-100",
    },
  ];

  useEffect(() => {
    if (activeTab === "users") {
      axios.get("https://dummyjson.com/users?limit=100").then((res) => {
        setUserData(res.data.users);
      });
    }
  }, [activeTab]);


  const filteredUsers = userData.filter(
    (user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  return (
    <div className="flex flex-col min-h-screen bg-[#fcf8f4]">
      <header className="bg-white shadow-md flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <img src="/lookmeallogo.png" alt="Logo" className="w-8 h-8 mr-2" />
          <h1 className="text-[#FF9800] font-bold text-xl">ルックミール</h1>
        </div>
        <FaUserCircle className="text-gray-600 text-2xl" />
      </header>

      <div className="flex">
        <aside className="w-56 bg-white shadow-md pt-4">
          <nav className="space-y-4 text-gray-700">
            {[
              { id: "dashboard", label: "📅 Dashboard" },
              { id: "users", label: "👥 Registered Users" },
              { id: "notifications", label: "🎁 Notifications" },
              { id: "docs", label: "👤 Admin Docs" },
            ].map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative cursor-pointer pl-2 py-2 rounded transition font-medium ${activeTab === item.id
                  ? "bg-orange-100 text-orange-500 font-bold"
                  : "hover:bg-gray-100"
                  }`}
              >
                {item.label}
                {activeTab === item.id && (
                  <span className="absolute top-0 right-0 h-full w-1 bg-orange-500 rounded-l-sm" />
                )}
              </div>
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-6">
          {activeTab === "dashboard" && (
            <>
              <div className="grid grid-cols-4 gap-4 mb-6">
                {cards.slice(0, 4).map((card, idx) => (
                  <div key={idx} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <div className="px-4 pt-3 pb-1">
                      <div className="text-sm font-medium text-gray-800 mb-1">{card.title}</div>
                      <div className="text-xs text-gray-500 mb-2">{card.period}</div>
                    </div>
                    <div className="px-4 py-3">
                      <div className="text-2xl font-bold text-gray-800">
                        {card.value}<span className="text-base font-semibold"> {card.unit}</span>
                      </div>
                      <div className="text-sm text-gray-500 mt-1 flex justify-between items-center">
                        <span>{card.sub}</span>
                        <span className={`ml-2 text-xs px-2 py-1 rounded ${card.changeColor} ${card.changeBg}`}>
                          {card.change}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <div className="w-1/2 bg-white p-4 rounded shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-sm text-gray-600 font-semibold">Gender / Age Breakdown</div>
                    <div className="text-sm text-gray-500">2024・01</div>
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data} margin={{ top: 20, right: 30, bottom: 10, left: 0 }}>
                      <XAxis dataKey="age" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="male" stackId="a" fill="#FFA726" name="Male" />
                      <Bar dataKey="female" stackId="a" fill="#FFCC80" name="Female" />
                      <Bar dataKey="other" stackId="a" fill="#FFE0B2" name="Other" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="w-1/2 grid grid-cols-2 gap-4 content-start">
                  {cards.slice(4).map((card, idx) => (
                    <div key={idx} className="bg-white rounded shadow-sm overflow-hidden h-fit">
                      <div className="px-4 pt-3 pb-1">
                        <div className="text-sm font-medium text-gray-800 mb-1">{card.title}</div>
                        <div className="text-xs text-gray-500 mb-2">{card.period}</div>
                      </div>
                      <div className="px-4 py-3">
                        <div className="text-2xl font-bold text-gray-800">
                          {card.value}<span className="text-base font-semibold"> {card.unit}</span>
                        </div>
                        <div className="text-sm text-gray-500 mt-1 flex justify-between items-center">
                          <span>{card.sub}</span>
                          <span className={`ml-2 text-xs px-2 py-1 rounded ${card.changeColor} ${card.changeBg}`}>
                            {card.change}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === "users" && (
            <>
              <div className="flex justify-between items-center mb-2 px-1">
                <h1 className="font-semibold text-2xl">Registered Users</h1>

                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    type="text"
                    placeholder="Nickname or Email Address"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border border-gray-300 rounded pl-9 pr-3 py-1 text-sm shadow-sm"
                  />
                </div>
              </div>

              <div className="bg-white rounded shadow">
                <table className="w-full text-sm text-left">
                  <thead className="text-gray-500 border-b">
                    <tr>
                      <th className="p-2">No.</th>
                      <th className="p-2">Nickname</th>
                      <th className="p-2">Email</th>
                      <th className="p-2">Address</th>
                      <th className="p-2">Company</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedUsers.map((user, index) => (
                      <tr key={user.id} className="border border-gray-200 hover:bg-gray-50">
                        <td className="p-2">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                        <td className="p-2">{user.firstName} {user.lastName}</td>
                        <td className="p-2 truncate max-w-[200px] cursor-pointer" title={user.email}>
                          {user.email}
                        </td>
                        <td className="p-2">{user.address.city}</td>
                        <td className="p-2">{user.company.name}</td>
                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>
              <div className="flex justify-between">
                <div className="flex justify-end mt-4 px-1 text-sm text-gray-500">
                  {'10 out of 5000 people'}
                </div>
                <div className="mt-4 space-x-1 me-2 flex items-center">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`px-2 py-2 border border-gray-300 rounded text-sm ${currentPage === 1 ? "text-gray-300" : "hover:bg-gray-100"}`}
                  >
                    <FaChevronLeft />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                    <button
                      key={num}
                      onClick={() => setCurrentPage(num)}
                      className={`px-3 py-1 rounded border border-gray-300 text-sm ${currentPage === num ? "bg-orange-500 text-white" : "hover:bg-gray-100"
                        }`}
                    >
                      {num}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`px-2 py-2 border border-gray-300 rounded text-sm ${currentPage === totalPages ? "text-gray-300" : "hover:bg-gray-100"}`}
                  >
                    <FaChevronRight />
                  </button>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
