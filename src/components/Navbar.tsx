"use client";

import Link from "next/link"
import MaxWidthWrapper from "./MaxWidthWrapper"
import { buttonVariants } from "./ui/button"
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs"
import { ArrowRight } from "lucide-react";
import PoliciesDropdown from "./PoliciesDropdown";

const Navbar = () => {
  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="flex z-40 font-semibold">
            <span>Quill </span>
          </Link>

          {/* Todo : mobile navbar */}

          <div className="hidden items-center space-x-4 sm:flex">
            <>
              <PoliciesDropdown/>
              <Link
                href='/pricing'
                className={buttonVariants({
                  variant: 'ghost',
                  size: 'sm',
                })}>
                Pricing
              </Link>
              <LoginLink className={buttonVariants({
                variant: 'ghost',
                size: 'sm',
              })}>
                Sign In
              </LoginLink>
              <RegisterLink className={buttonVariants({
                size: 'sm',
                variant: "defaultBlack"
              })}>
                Get Started <ArrowRight/>
              </RegisterLink>
            </>
          </div>

        </div>
      </MaxWidthWrapper>
    </nav>
  )
}

export default Navbar