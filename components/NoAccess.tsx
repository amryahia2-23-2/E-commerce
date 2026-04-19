import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import Logo from './Logo'
import { SignInButton, SignUpButton } from '@clerk/nextjs'
import { Button } from './ui/button'

function NoAccess({
    details = "Log in to view your cart items and checkout. Don't miss out on your favorite products!"

}: {details?: string}) {
  return (
    <div className="flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex items-center flex-col gap-1">
            <Logo />
            <CardTitle className="text-2xl font-bold text-center">Welcome Back!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <p className="text-center font-medium text-darkColor/80 ">{details}</p>
        <SignInButton mode="modal">
            <Button  className="bg-shop_dark_green/80 w-full p-5 text-white font-semibold shadow hover:bg-shop_dark_green hoverEffect">
                Sign In
            </Button>
        </SignInButton>
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-3">
            <div className="text-sm text-muted-foreground text-center">
                Don&rsquo;t have an account?
            </div>
            <SignUpButton mode="modal">
                <Button variant="outline" className="w-full" size="lg" >
                    Create an account
                </Button>
            </SignUpButton>
        </CardFooter>
      </Card>
    </div>
  )
}

export default NoAccess
