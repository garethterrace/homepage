---
layout: post
title: Working with Microsoft is hard.
author: gareth_terrace
date: '2024-03-24 17:41:31'
intro_paragraph: ''
---

# Working with Microsoft is hard

I'm a long time windows user (3.1 was good!) and I've been writing code with MS tools since VB6 came out. 

I've now moved into enterprise world where working with MS APIs and tooling alongside c#  is....not as good as it could be.

I'm so frustrated and tired of it, I'm using typing as therapy.

## Problem 1: Logging in
Logging into a Microsoft account in 2024 is, for me at least, like a carefully constructed digital reverse escape room. 
1) Which account?
The first hurdle is this mess: ![Which account do you want to use? - Microsoft Support](data:image/png;base64,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)

I've separated my accounts a few times now, but they always end up conjoined again. My personal account has access to some things, my work account has access to others. Is there a central place I can find out what these things are and move them? No. Is there any clue when you join these up that you're sure you want to do it? No. 
You're in account limbo, your best bet is to have one browser logged into one and another logged into the other, then try both. Every time.

**Which would be fine if you could stay logged in....**
![I have to enter my login credentials every time I go to Office 365 -  Microsoft Community](https://filestore.community.support.microsoft.com/api/images/bf3faf3a-857f-4d50-beb7-947bd80d7108?upload=true)

This checkbox and dialog is probably the biggest lie in modern computing. You check it, it comes back the next time you log in, you don't check it? It still comes back?

Got 2FA? Doesn't matter, we're still going to request codes from you 12 times a day, every day...for ever.


## Okay fine, logging in is poor, but that's not all of MS is it?
Yeah this is frustrating, but it's nothing when you get into the meat of the real problem.... **Microsoft APIs** 

It's at the point where I actively dread working on anything to do with MS Graph, Teams, Outlook integrations, Authentication or any of the myriad other tools we use.

The dependency chain alone is enough to put me off - sometimes you need to update a library for say...Azure storage accounts, which then means all your other seemingly unrelated libraries also need updating which breaks your whole app so what started as a "Relatively quick update to some MS Storage account Azure code" quickly turns into "Oh I need to also update MS Graph and my Outlook integration".   

This isn't a one off - I've had multiple occasions where just updating a Nuget package for something in Azure has completely broken Graph or OAuth. 

Why is it like this? 

Also the documentation, it's an absolute hot mess. Anyone else's API docs are simple to navigate, give you nice code samples and real world use cases (look at Stripe, Slack, CustomerIO, there's loads).

Microsoft give you anything from just plain HTTP Requests with no clue what library they refer to, or how to authenticate to so much detail on stuff you don't even know if that's the right thing to use. 

I appreciate they're supporting a lot of legacy systems, but isn't that what API and library versioning is for?


## Then there's Teams
This is the main one for me. We have a relatively simple Slack integration and also a Teams one. We charge extra for the teams one because working with Microsoft is a *genuine and real threat to anyone's sanity*

Here's a recent example.

We rebranded, needed to update the logos on a bunch of integrations.

Slack:

 - Update the branding in the dev dashboard
 - Create a quick test Slack account 
 - Create some dummy Slack and App users so the team can demo it
 - Explain to Slack that no code has changed, it's just a logo update - give them the creds to test
 - Slack test it, agree it's all good. Thing goes live.

Contrast that with Teams:

 - Update the branding in..
	 - MS Bot Framework (specific image requirements)
	 - MS Partner Center (different, slightly more specific image requirements)
	 - Teams Dev Console (slightly different specific image requirements)
	 - Don't forget to log into each one of them separately despite checking remember me on each one
 - Update your app assets in the manifest in Dev Console.
 - Create a test teams account....
	 - Oh they have a dev sandbox for creating a test tenant, great.
		 - Not eligible for a sandbox account...Back to square one.
	 - Create a free Azure AD Tenant. Don't forget to add card details for when your trial ends!
	 - Create a free O365 test account (also add card details)
	 - Link the two, being careful not to mix them into your existing Microsoft rats nest of personal and business accounts
	 - Test your teams app with that account
	 - Submit that to teams
	 - Get rejected because they can't test it on their test tenant, despite you giving them instructions to use the test one you've provided.

This is where I'm currently at. I don't really know where to go from here and I've run out of patience. 

Is there anyone in MS dev relations? Do they actually use their own products? Can someone more seasoned explain how this is supposed to work? The documentation is mental and there's no clarity on exactly how the teams approval process works.

3 weeks now. I just wanted to update a logo.

 
