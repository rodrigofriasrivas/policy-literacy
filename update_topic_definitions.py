#!/usr/bin/env python3
"""
Update all 25 topic names and definitions in Supabase.
Run from the project root. Requires .env with VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY.
"""

import os
import json
from dotenv import load_dotenv
import httpx

load_dotenv()

SUPABASE_URL = os.getenv("VITE_SUPABASE_URL")
SUPABASE_KEY = os.getenv("VITE_SUPABASE_PUBLISHABLE_KEY") or os.getenv("VITE_SUPABASE_ANON_KEY")

headers = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
    "Content-Type": "application/json",
    "Prefer": "return=minimal",
}

TOPICS = [
    {
        "topic_id": 1,
        "topic_name": "New Venture Creation",
        "definition": "Research on how entrepreneurs identify opportunities, assemble resources, and build scalable business models — from early-stage legitimacy through to market entry and growth."
    },
    {
        "topic_id": 2,
        "topic_name": "Academic Spin-offs",
        "definition": "Research on how scientific knowledge moves from universities into commercial ventures, examining the institutional arrangements, innovation management practices, and dual identities that academic entrepreneurs navigate in the process."
    },
    {
        "topic_id": 3,
        "topic_name": "Gender in Entrepreneurship",
        "definition": "Research on how gender shapes access to entrepreneurial opportunities, resources, and legitimacy — and how innovation policy, technology contexts, and institutional structures reproduce or challenge those patterns across the field broadly."
    },
    {
        "topic_id": 4,
        "topic_name": "Sustainable Innovation",
        "definition": "Research on how ventures develop economically viable solutions within ecological limits — examining green innovation, sustainable finance, and the governance mechanisms that enable sustainability-oriented entrepreneurship at the firm level."
    },
    {
        "topic_id": 5,
        "topic_name": "High-Growth Technology Ventures",
        "definition": "Research on the capabilities and conditions that enable technology-intensive ventures to achieve high growth, with attention to regional innovation systems, entrepreneurial action, and the innovation capacity required to scale."
    },
    {
        "topic_id": 6,
        "topic_name": "Economic Policy Design",
        "definition": "Research on how fiscal instruments, policy modelling, and market structures shape entrepreneurial activity and economic growth — examining how tax policy, capital markets, and joint venture arrangements influence venture formation and investment patterns."
    },
    {
        "topic_id": 7,
        "topic_name": "Policy Innovation",
        "definition": "Research on how governments develop new approaches to enterprise support, examining evidence-based experimentation, policy learning, and the innovation processes through which policy systems adapt to changing business environments."
    },
    {
        "topic_id": 8,
        "topic_name": "Entrepreneurship Education",
        "definition": "Research on how educational programmes develop entrepreneurial competencies and identities, examining pedagogical methods, higher education contexts, and the link between academic entrepreneurship and student venture creation behaviour."
    },
    {
        "topic_id": 9,
        "topic_name": "Peripheral and Informal Contexts",
        "definition": "Research on entrepreneurship in rural, informal, and resource-constrained environments — examining how policy uncertainty, climate pressures, and social exclusion shape entrepreneurial activity at the margins of the formal economy."
    },
    {
        "topic_id": 10,
        "topic_name": "Startup Financing",
        "definition": "Research on how new ventures access private financial resources, examining venture capital markets, business angel networks, social capital, and the investment dynamics that shape capital allocation across the startup ecosystem."
    },
    {
        "topic_id": 11,
        "topic_name": "Global Entrepreneurship Policy",
        "definition": "Research on cross-national variation in enterprise policy design and effectiveness, examining how institutional context, development stage, and the gap between nascent and developed entrepreneurship ecosystems shape policy outcomes and conditions for transfer."
    },
    {
        "topic_id": 12,
        "topic_name": "Social Entrepreneurship",
        "definition": "Research on the organisational logic and strategic approaches of social enterprises, examining how ventures balance social innovation with financial viability — and how entrepreneurial intentions translate into social impact through hybrid organisational forms."
    },
    {
        "topic_id": 13,
        "topic_name": "SME Policy and Development",
        "definition": "Research on how small firms contribute to economic growth and development, and how policy implementation shapes those contributions across economic and environmental contexts."
    },
    {
        "topic_id": 14,
        "topic_name": "Family Business",
        "definition": "Research on the distinctive dynamics of family-controlled enterprises, examining how intergenerational relationships, decision-making processes, and entrepreneurial orientation interact within family firm governance structures."
    },
    {
        "topic_id": 15,
        "topic_name": "Policy Diffusion",
        "definition": "Research on how enterprise policy innovations spread across policy contexts, examining the role of policy entrepreneurs, knowledge brokers, organisational learning, and policy transfer mechanisms in driving adoption and adaptation."
    },
    {
        "topic_id": 16,
        "topic_name": "Entrepreneurial Ecosystems",
        "definition": "Research on the interdependent networks of actors, institutions, and resources that collectively shape entrepreneurial activity within a territory — including social entrepreneurship as a distinct form the ecosystem enables or constrains — and how governance structures determine ecosystem outcomes."
    },
    {
        "topic_id": 17,
        "topic_name": "Venture Finance and Policy Evaluation",
        "definition": "Research on public financial interventions for new ventures, with particular focus on policy evaluation approaches, market failure diagnostics, and how funding instruments perform across the venture life cycle — distinct from private capital markets covered in Topic 10."
    },
    {
        "topic_id": 18,
        "topic_name": "Inclusive Entrepreneurship",
        "definition": "Research on who is excluded from the entrepreneurial economy and what policy does about it — examining income inequality, refugee and marginalised entrepreneurs, third sector responses, and the policy frameworks designed to broaden participation in enterprise."
    },
    {
        "topic_id": 19,
        "topic_name": "Climate Technology Policy",
        "definition": "Research on the policy frameworks that connect technological innovation with climate goals — examining how regulatory incentives, green technology strategies, and rural and digital entrepreneurship contexts interact in driving climate-responsive enterprise."
    },
    {
        "topic_id": 20,
        "topic_name": "Digital Business Models",
        "definition": "Research on how digital technologies transform entrepreneurial opportunity creation and value capture at the firm level — examining platform-based models, digital entrepreneurship strategies, and how entrepreneurial learning shapes the adoption of digital tools and platforms."
    },
    {
        "topic_id": 21,
        "topic_name": "Entrepreneurial Cognition",
        "definition": "Research on the cognitive frameworks, self-efficacy beliefs, and entrepreneurial intentions that shape opportunity recognition and venture creation — with attention to how gender and emerging economy contexts influence those cognitive processes."
    },
    {
        "topic_id": 22,
        "topic_name": "Migrant and Diaspora Entrepreneurship",
        "definition": "Research on entrepreneurship among migrant and diaspora communities, examining how immigrant entrepreneurs navigate institutional environments, build cross-border networks, and engage with policy and capacity-building support in host countries."
    },
    {
        "topic_id": 23,
        "topic_name": "Low-Carbon Transition",
        "definition": "Research on entrepreneurship in low-carbon transitions, examining how access to finance, economic performance pressures, and carbon reduction goals interact — with particular attention to developing country contexts where financing constraints shape the pace of transition."
    },
    {
        "topic_id": 24,
        "topic_name": "Digital Economy",
        "definition": "Research on how digital transformation and technological progress reshape entrepreneurial contexts at a structural level — including the emergence of informal digital entrepreneurship, the role of big data in new venture creation, and how the digital economy redistributes entrepreneurial opportunity."
    },
    {
        "topic_id": 25,
        "topic_name": "Gender Equity in Workplaces",
        "definition": "Research on policy interventions targeting gender disparities within entrepreneurial work contexts — examining how regulatory frameworks, parental leave provisions, and work-family arrangements shape women's participation and leadership in enterprise. Distinct from Topic 3, which addresses gendered structures of the entrepreneurship field broadly."
    },
]

print(f"Updating {len(TOPICS)} topics in Supabase...")
errors = []

for topic in TOPICS:
    response = httpx.patch(
        f"{SUPABASE_URL}/rest/v1/topics?topic_id=eq.{topic['topic_id']}",
        headers=headers,
        json={
            "topic_name": topic["topic_name"],
            "definition": topic["definition"]
        }
    )
    if response.status_code in (200, 204):
        print(f"  ✓ Topic {topic['topic_id']}: {topic['topic_name']}")
    else:
        print(f"  ✗ Topic {topic['topic_id']} FAILED: {response.status_code} {response.text}")
        errors.append(topic['topic_id'])

print()
if errors:
    print(f"ERRORS on topics: {errors}")
else:
    print("All 25 topics updated successfully.")
