import Link from 'next/link';
import React from 'react';
import { StyledLink } from './utils.style';

const ReusableLink = ({
  href,
  key,
  children,
}: {
  href: string;
  key?: string;
  children: React.ReactNode;
}) => (
  <Link passHref href={href}>
    <StyledLink>{children}</StyledLink>
  </Link>
);

export default ReusableLink;
