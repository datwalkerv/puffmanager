import Link from "next/link";

import type { Metadata } from "next";
import { redirect } from "next/navigation";

const appName = "PuffManager";

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: any;
}): Promise<Metadata> {
  const params = await searchParams;

  const status = parseInt(params?.status as string, 10) || redirect("/");

  const statusInfo = statusCodes[status] || {
    header: "Unknown Error",
    message: "An unknown error occurred.",
  };

  return {
    title: `${appName} | ${params?.status}`,
    description: statusInfo.message,
  };
}

const statusCodes: any = {
  400: {
    header: "Bad Request.",
    message:
      "The server cannot process the request due to a client-side error.",
  },
  409: {
    header: "Conflict Occurred.",
    message: "A conflict occurred while processing the request.",
  },
  422: {
    header: "Unprocessable Entity.",
    message:
      "The server understands the content type of the request but cannot process the contained instructions.",
  },
  429: {
    header: "Too Many Requests.",
    message: "You have sent too many requests in a short period of time.",
  },
  500: {
    header: "Server Error.",
    message: "An unexpected error occurred. Please try again later.",
  },
};

export default async function StatusError({
  searchParams,
}: {
  searchParams?: any;
}) {
  const params = await searchParams;

  const status = (params?.status as string) || redirect("/");
  const statusInfo = statusCodes[status] || redirect("/");

  const additionalMessage = params?.message || null;

  return (
    <section className="flex items-center justify-center h-full px-16 py-[5rem]">
      <div className="max-w-[30rem] text-center">
        <h1 className="mb-8 font-extrabold text-9xl">
          <span className="sr-only">Error</span>
          {status}
        </h1>

        <h2 className="text-2xl font-semibold md:text-3xl">
          {statusInfo.header}
        </h2>

        <p className="mt-4 mb-8 dark:text-gray-500">
          {statusInfo.message}
          {!additionalMessage ? (
            "."
          ) : (
            <>
              {" "}
              <br />
              {additionalMessage}{" "}
            </>
          )}
        </p>

        <Link
          rel="noopener noreferrer"
          href="/"
          className="px-8 py-3 font-semibold rounded text-black bg-yellow hover:bg-lightyellow transition-colors"
        >
          Back to Homepage
        </Link>
      </div>
    </section>
  );
}
