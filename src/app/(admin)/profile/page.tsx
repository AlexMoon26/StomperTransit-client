import { profile } from "@/api/auth";
import { Account } from "@/components/admin/account";
import React from "react";

async function ProfilePage() {
  const user = await profile();
  return (
    <>
      <Account user={user} />
    </>
  );
}

export default ProfilePage;
