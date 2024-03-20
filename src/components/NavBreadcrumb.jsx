import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";

export default function NavBreadcrumb() {
    return (
        <>
            <Breadcrumb>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
                </BreadcrumbItem>
                {window.location.pathname.split('/').map((location) => (
                    <BreadcrumbItem>
                        <BreadcrumbLink textTransform={'capitalize'}>{location}</BreadcrumbLink>
                    </BreadcrumbItem>
                ))}
            </Breadcrumb>
        </>
    )
}