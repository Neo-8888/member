// mock-api.js - Drop-in replacement for your api.js
const API_BASE = '/api';

// Mock data
const MOCK_USERS = [
    {
        id: 1,
        email: 'neo@motise.com',
        password: 'motise@neo05',
        firstName: 'Neo',
        lastName: 'Motise',
        role: 'admin',
        idNumber: '9001015000089',
        phone: '0712345678'
    },
    {
        id: 2,
        email: 'test@user.com',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User',
        role: 'client',
        idNumber: '8505055000089',
        phone: '0723456789'
    }
];

const MOCK_POLICIES = [
    {
        id: 1,
        userId: 1,
        policyNumber: 'INS-SA-2024-001',
        policyType: 'car',
        status: 'active',
        startDate: '2024-01-01',
        endDate: '2025-01-01',
        premium: {
            amount: 850,
            currency: 'ZAR',
            frequency: 'monthly'
        },
        coverageDetails: {
            sumInsured: 250000,
            excess: 2500,
            benefits: ['Third Party Liability', 'Theft', 'Fire'],
            exclusions: ['Wear and tear', 'Mechanical breakdown']
        },
        vehicleDetails: {
            make: 'Toyota',
            model: 'Hilux',
            year: 2022,
            registration: 'CA 123-456',
            value: 250000
        },
        claims: [
            {
                claimNumber: 'CL-2024-001',
                date: '2024-03-15',
                amount: 15000,
                status: 'approved',
                description: 'Minor accident repair'
            }
        ]
    },
    {
        id: 2,
        userId: 1,
        policyNumber: 'INS-SA-2024-002',
        policyType: 'home',
        status: 'active',
        startDate: '2024-02-01',
        endDate: '2025-02-01',
        premium: {
            amount: 1200,
            currency: 'ZAR',
            frequency: 'monthly'
        },
        coverageDetails: {
            sumInsured: 1500000,
            excess: 5000,
            benefits: ['Fire', 'Theft', 'Storm Damage'],
            exclusions: ['Earthquake', 'War']
        }
    }
];

// Mock functions that simulate API calls
async function login(email, password) {
    console.log('Mock login called:', email);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Find user
    const user = MOCK_USERS.find(u => 
        u.email.toLowerCase() === email.toLowerCase() && 
        u.password === password
    );
    
    if (!user) {
        throw new Error('Invalid email or password');
    }
    
    // Create mock JWT token
    const mockToken = btoa(JSON.stringify({
        userId: user.id,
        email: user.email,
        exp: Date.now() + 86400000 // 24 hours
    }));
    
    // Return mock response matching your backend structure
    return {
        token: mockToken,
        user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role
        }
    };
}

async function getPolicies(token) {
    console.log('Mock getPolicies called');
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Verify token (in a real app, this would be JWT verification)
    try {
        const tokenData = JSON.parse(atob(token));
        const userId = tokenData.userId;
        
        // Filter policies for this user
        const userPolicies = MOCK_POLICIES.filter(p => p.userId === userId);
        
        return {
            count: userPolicies.length,
            policies: userPolicies
        };
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
}

function saveToken(token) {
    localStorage.setItem('mp_token', token);
    console.log('Token saved to localStorage');
}

function getToken() {
    return localStorage.getItem('mp_token');
}

function clearToken() {
    localStorage.removeItem('mp_token');
    console.log('Token cleared from localStorage');
}

// Override your original api.js functions
window.api = {
    login,
    getPolicies,
    saveToken,
    getToken,
    clearToken
};