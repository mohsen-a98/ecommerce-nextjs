import ChangePasswordForm from "./ChangePasswordForm";

function page() {
  return (
    <div className="flex flex-col gap-6 pl-12">
      <h2 className="text-base font-semibold">Change Password</h2>
      <div className="mt-12 w-[350px]">
        <ChangePasswordForm />
      </div>
    </div>
  );
}

export default page;
