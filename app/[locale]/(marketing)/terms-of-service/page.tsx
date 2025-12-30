import type { Metadata } from "next";

import { LegalDocument } from "@/components/marketing/legal-document";
import { Container } from "@/components/ui/container";
import type { Messages } from "@/i18n/messages";
import { getMessages } from "next-intl/server";

type TermsOfServicePageProps = {
  params: Promise<{ locale: string }>;
};

export const generateMetadata = async ({ params }: TermsOfServicePageProps): Promise<Metadata> => {
  const { locale: rawLocale } = await params;
  const locale = rawLocale;
  const messages = (await getMessages()) as Messages;

  return {
    title: `${messages.ui.footer.termsOfServiceLabel} | ${messages.ui.marketingPage.meta.title}`,
    description: messages.ui.marketingPage.meta.description,
    alternates: {
      canonical: `/${locale}/terms-of-service`,
    },
  };
};

const TermsOfServicePage = async ({ params }: TermsOfServicePageProps) => {
  const { locale: rawLocale } = await params;
  const locale = rawLocale;
  const messages = (await getMessages()) as Messages;

  return (
    <Container className="pb-20 pt-28 sm:pt-32">
      <LegalDocument document={messages.content.legal.termsOfService} />
    </Container>
  );
};

export default TermsOfServicePage;


