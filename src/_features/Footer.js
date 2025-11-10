import MovieIcon from "@/_icons/HeaderIcon";
import EmailIcon from "@/_icons/EmailIcon";
import PhoneIcon from "@/_icons/PhoneIcon";
import HeaderIcon from "@/_icons/HeaderIcon";
export default function Footer() {
  return (
    <div className="bg-indigo-700 h-[280px] flex flex-row w-full justify-center  gap-96  ">
      <div className="  flex flex-col pt-[70px] max-w-[1440px]">
        <HeaderIcon className="fill-white stroke-white" />
        <div className="text-white "> © 2024 Movie Z. All Rights Reserved.</div>
      </div>
      <div className="flex  gap-30  max-w-[1440px]">
        <div className="flex flex-col pt-[70px] gap-5 ">
          <p className="text-white ">Contact Heading </p>
          <div className="flex items-center gap-2">
            <EmailIcon />
            <div className="text-white">
              <p> Email:</p>
              <p> support@movieZ.com</p>
            </div>
          </div>
          <div className="flex items-center gap-2 ">
            <PhoneIcon />
            <div className="text-white">
              <p> Phone:</p>
              <p> +976 (11) 123-4567</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col pt-[70px] gap-3">
          <p className="text-white flex flex-col">Follow us </p>
          <div className="text-white flex flex-row gap-5">
            <p>Facebook</p>
            <p>Instagram</p>
            <p>Twitter</p>
            <p>Youtube</p>
          </div>
        </div>
      </div>
    </div>
  );
}
