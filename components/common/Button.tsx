'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

type ButtonProps = {
    children: React.ReactNode
    href?: string
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
    className?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function Button({
    children,
    href,
    onClick,
    className = '',
    ...props
}: ButtonProps) {
    const router = useRouter()

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (onClick) onClick(e)

        if (href) {
            router.push(href)
        }
    }

    return (
        <button
            onClick={handleClick}
            className={className}
            {...props}
        >
            {children}
        </button>
    )
}