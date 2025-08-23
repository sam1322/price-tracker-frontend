
import Providers from '@/components/Provider';

interface LayoutProps {
    children: React.ReactNode;
}

export default function AIVideoGenerationLayout({ children }: LayoutProps) {
    return (
        <Providers>
            {children}
        </Providers>
    )
}