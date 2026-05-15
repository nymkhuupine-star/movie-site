import EmailIcon from "@/_icons/EmailIcon";
import PhoneIcon from "@/_icons/PhoneIcon";
import HeaderIcon from "@/_icons/HeaderIcon";

export default function Footer() {
  return (
    <footer className="bg-indigo-700 w-full flex justify-center">
      <div className="w-full max-w-[1280px] px-4 sm:px-6 py-10 flex flex-col sm:flex-row sm:justify-between gap-10">
        <div className="flex flex-col gap-3">
          <HeaderIcon className="fill-white stroke-white" />
          <div className="text-white text-sm">
            © 2024 Movie Z. All Rights Reserved.
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-10">
          <div className="flex flex-col gap-5">
            <p className="text-white font-semibold">Contact</p>
            <div className="flex items-center gap-3">
              <EmailIcon />
              <div className="text-white text-sm">
                <p className="opacity-90">Email</p>
                <p>support@movieZ.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <PhoneIcon />
              <div className="text-white text-sm">
                <p className="opacity-90">Phone</p>
                <p>+976 (11) 123-4567</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-white font-semibold">Follow us</p>
            <div className="text-white text-sm flex flex-wrap gap-x-5 gap-y-2">
              <p>Facebook</p>
              <p>Instagram</p>
              <p>Twitter</p>
              <p>Youtube</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

