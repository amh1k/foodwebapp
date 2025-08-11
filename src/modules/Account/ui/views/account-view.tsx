"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function AccountView() {
  const [profileImage, setProfileImage] = useState("/default-avatar.png");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = URL.createObjectURL(e.target.files[0]);
      setProfileImage(file);
    }
  };

  return (
    <section className="min-h-screen px-4 py-10 bg-gray-50 flex justify-center">
      <div className="w-full max-w-5xl bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>

        <Tabs defaultValue="profile" className="w-full">
          {/* Tabs Header */}
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="mt-6">
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              {/* Profile Image */}
              <div className="flex flex-col items-center">
                <Image
                  src={profileImage}
                  alt="Profile"
                  width={120}
                  height={120}
                  className="rounded-full object-cover border"
                />
                <label className="mt-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <Button variant="outline" size="sm" asChild>
                    <span>Change Photo</span>
                  </Button>
                </label>
              </div>

              {/* Basic Info */}
              <div className="flex-1 space-y-4 w-full">
                <div>
                  <label className="block text-sm font-medium">Username</label>
                  <Input placeholder="Enter username" />
                </div>
                <div>
                  <label className="block text-sm font-medium">Email</label>
                  <Input type="email" placeholder="Enter email" />
                </div>
                <Button className="bg-primary">Save Changes</Button>
              </div>
            </div>
          </TabsContent>

          {/* Account Tab */}
          <TabsContent value="account" className="mt-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">
                  Current Password
                </label>
                <Input type="password" placeholder="Enter current password" />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  New Password
                </label>
                <Input type="password" placeholder="Enter new password" />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Confirm New Password
                </label>
                <Input type="password" placeholder="Confirm new password" />
              </div>
              <Button className="bg-amber-600">Update Password</Button>
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="mt-6">
            <div className="space-y-4">
              {[1, 2, 3].map((order) => (
                <div
                  key={order}
                  className="p-4 border rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-semibold">Order #{1000 + order}</p>
                    <p className="text-sm text-gray-600">
                      Date: 2025-08-{10 + order}
                    </p>
                  </div>
                  <div className="mt-2 sm:mt-0">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
