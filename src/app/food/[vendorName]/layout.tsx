import { getVendorByName } from "@/api/vendor";
import { UpperVendorViewPage } from "@/modules/vendors/ui/views/upper-vendor-view-page";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";

interface Props {
  params: Promise<{ vendorName: string }>;
  children: React.ReactNode;
}

export default async function Layout({ params, children }: Props) {
  const { vendorName } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [`${vendorName}`],
    queryFn: async () => {
      return getVendorByName({ vendorName: vendorName });
    },
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="min-h-screen bg-gray-100">
        <Suspense fallback={<div>Loading</div>}>
          <UpperVendorViewPage vendorName={vendorName} />
        </Suspense>
        {children}
      </div>
    </HydrationBoundary>
  );
}
