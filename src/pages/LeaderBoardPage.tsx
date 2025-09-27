import { useState } from "react";
import { Tabs, Table, Card, Typography, Avatar, Tag } from "antd";
import { useQuery } from "@tanstack/react-query";
import { api } from "../axiosClient";

const { Title, Text } = Typography;

interface LeaderboardUser {
  name: string;
  memberSince: string;
  totalScore: number;
}

const LeaderboardPage = () => {
  const [timeSlot, setTimeSlot] = useState("All_time");

  const { data: newUsersWithTotalScores, isLoading } = useQuery({
    queryKey: ["get-leaderboard", timeSlot],
    queryFn: async () => {
      const response = await api.get(
        `/leaderboard/get-leaderboard-details?time_slot=${timeSlot}`
      );
      return response.data.newUsersWithTotalScores;
    },
  });

  const columns = [
    {
      title: "Rank",
      key: "rank",
      render: (_: string, __: LeaderboardUser, index: number) => {
        const rank = index + 1;
        let color: string | undefined;
        if (rank === 1) color = "gold";
        else if (rank === 2) color = "silver";
        else if (rank === 3) color = "volcano";

        return (
          <Tag
            color={color}
            className="text-base font-semibold px-3 py-1 rounded-lg"
          >
            #{rank}
          </Tag>
        );
      },
    },
    {
      title: "User",
      dataIndex: "name",
      key: "name",
      render: (name: string) => (
        <div className="flex items-center gap-2">
          <Avatar style={{ backgroundColor: "#1677ff" }}>
            {name.charAt(0).toUpperCase()}
          </Avatar>
          <Text strong className="text-gray-800">
            {name}
          </Text>
        </div>
      ),
    },
    {
      title: "Member Since",
      dataIndex: "memberSince",
      key: "memberSince",
      render: (date: string) => (
        <Text type="secondary">{new Date(date).toLocaleDateString()}</Text>
      ),
    },
    {
      title: "Total Score",
      dataIndex: "totalScore",
      key: "totalScore",
      sorter: (a: LeaderboardUser, b: LeaderboardUser) =>
        a.totalScore - b.totalScore,
      render: (score: number) => (
        <Text strong className="text-green-600">
          {score}
        </Text>
      ),
    },
  ];

  const filteredData = [...(newUsersWithTotalScores || [])].sort(
    (a, b) => b.totalScore - a.totalScore
  );

  const tabItems = [
    { key: "All_time", label: "🌟 All Time" },
    { key: "this_week", label: "📅 This Week" },
    { key: "this_month", label: "🗓️ This Month" },
    { key: "today", label: "⚡ Today" },
  ];

  // Add rowClassName for alternating row colors + top 3 highlight
  const rowClassName = (_record: LeaderboardUser, index: number) => {
    if (index === 0) return "bg-yellow-100"; // first
    if (index === 1) return "bg-gray-200";   // second
    if (index === 2) return "bg-orange-100"; // third
    return index % 2 === 0 ? "bg-white" : "bg-gray-50"; // alternating
  };

  return (
    <div className="p-6 flex justify-center bg-gradient-to-b from-indigo-50 via-white to-pink-50 min-h-screen">
      <Card
        className="shadow-2xl rounded-2xl w-full max-w-4xl border border-gray-200"
        bodyStyle={{ padding: "2rem", backgroundColor: "#fefefe" }}
      >
        <Title
          level={3}
          className="mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-500"
        >
          🏆 Leaderboard
        </Title>
        <Tabs
          activeKey={timeSlot}
          onChange={setTimeSlot}
          centered
          items={tabItems.map((tab) => ({
            key: tab.key,
            label: <span className="font-medium text-base">{tab.label}</span>,
            children: (
              <Table
                loading={isLoading}
                dataSource={filteredData || []}
                columns={columns}
                pagination={false}
                rowKey="name"
                className="rounded-lg overflow-hidden"
                rowClassName={rowClassName}
              />
            ),
          }))}
        />
      </Card>
    </div>
  );
};

export default LeaderboardPage;
