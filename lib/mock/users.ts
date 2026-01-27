import { User } from '@/types/user';

export const mockUsers: User[] = [
    {
        id: 'USR-001',
        username: 'Alice B. Bevill',
        email: 'alice.bevill@example.com',
        phone: '732-533-0201',
        joiningDate: '2017-06-16',
        status: 'active',
        addresses: [
            { label: 'Home', line1: '2231 Webster Street', city: 'Newark', state: 'NJ', zip: '07102', country: 'USA' },
            { label: 'Work', line1: '120 Market St', city: 'Newark', state: 'NJ', zip: '07105', country: 'USA' },
            { label: 'Billing', line1: '45 Central Ave', city: 'Newark', state: 'NJ', zip: '07103', country: 'USA' },
            { label: 'Shipping', line1: '99 Broad St', city: 'Newark', state: 'NJ', zip: '07104', country: 'USA' }
        ]
    },
    {
        id: 'USR-002',
        username: 'Betty M. Housley',
        email: 'betty.housley@example.com',
        phone: '435-261-6681',
        joiningDate: '2016-06-20',
        status: 'active',
        addresses: [
            { label: 'Home', line1: '424 North Street', city: 'Salt Lake City', state: 'UT', zip: '84104', country: 'USA' },
            { label: 'Work', line1: '12 State St', city: 'Salt Lake City', state: 'UT', zip: '84111', country: 'USA' },
            { label: 'Billing', line1: '18 West Temple', city: 'Salt Lake City', state: 'UT', zip: '84101', country: 'USA' },
            { label: 'Shipping', line1: '77 Main St', city: 'Salt Lake City', state: 'UT', zip: '84115', country: 'USA' }
        ]
    },
    {
        id: 'USR-003',
        username: 'Betty M. Litwin',
        email: 'betty.litwin@example.com',
        phone: '903-457-6202',
        joiningDate: '2016-03-05',
        status: 'pending',
        addresses: [
            { label: 'Home', line1: '2317 Florence Street', city: 'Greenville', state: 'TX', zip: '75401', country: 'USA' },
            { label: 'Work', line1: '18 Elm St', city: 'Greenville', state: 'TX', zip: '75402', country: 'USA' },
            { label: 'Billing', line1: '66 Oak St', city: 'Greenville', state: 'TX', zip: '75403', country: 'USA' },
            { label: 'Shipping', line1: '72 Pine St', city: 'Greenville', state: 'TX', zip: '75404', country: 'USA' }
        ]
    },
    {
        id: 'USR-004',
        username: 'Chris T. Parks',
        email: 'chris.parks@example.com',
        phone: '407-855-7376',
        joiningDate: '2017-03-20',
        status: 'active',
        addresses: [
            { label: 'Home', line1: '1521 McDonald Avenue', city: 'Orlando', state: 'FL', zip: '32809', country: 'USA' },
            { label: 'Work', line1: '12 Orange Ave', city: 'Orlando', state: 'FL', zip: '32801', country: 'USA' },
            { label: 'Billing', line1: '32 Lake Eola Dr', city: 'Orlando', state: 'FL', zip: '32803', country: 'USA' },
            { label: 'Shipping', line1: '88 Colonial Dr', city: 'Orlando', state: 'FL', zip: '32804', country: 'USA' }
        ]
    },
    {
        id: 'USR-005',
        username: 'Edward E. White',
        email: 'edward.white@example.com',
        phone: '850-561-1648',
        joiningDate: '2017-06-22',
        status: 'active',
        addresses: [
            { label: 'Home', line1: '1246 Drainer Avenue', city: 'Tallahassee', state: 'FL', zip: '32301', country: 'USA' },
            { label: 'Work', line1: '400 Adams St', city: 'Tallahassee', state: 'FL', zip: '32303', country: 'USA' },
            { label: 'Billing', line1: '510 College Ave', city: 'Tallahassee', state: 'FL', zip: '32304', country: 'USA' },
            { label: 'Shipping', line1: '802 Tennessee St', city: 'Tallahassee', state: 'FL', zip: '32304', country: 'USA' }
        ]
    },
    {
        id: 'USR-006',
        username: 'Essie A. Nixon',
        email: 'essie.nixon@example.com',
        phone: '269-639-7228',
        joiningDate: '2016-06-22',
        status: 'blocked',
        addresses: [
            { label: 'Home', line1: '2259 Goff Avenue', city: 'South Haven', state: 'MI', zip: '49090', country: 'USA' },
            { label: 'Work', line1: '420 Michigan Ave', city: 'South Haven', state: 'MI', zip: '49090', country: 'USA' },
            { label: 'Billing', line1: '52 Phoenix St', city: 'South Haven', state: 'MI', zip: '49090', country: 'USA' },
            { label: 'Shipping', line1: '12 Broadway', city: 'South Haven', state: 'MI', zip: '49090', country: 'USA' }
        ]
    },
    {
        id: 'USR-007',
        username: 'Fabian M. Berryhill',
        email: 'fabian.berryhill@example.com',
        phone: '518-281-2680',
        joiningDate: '2017-06-20',
        status: 'active',
        addresses: [
            { label: 'Home', line1: '77 Pine Ave', city: 'North Greenbush', state: 'NY', zip: '12144', country: 'USA' },
            { label: 'Work', line1: '19 River Rd', city: 'North Greenbush', state: 'NY', zip: '12144', country: 'USA' },
            { label: 'Billing', line1: '33 Oakwood St', city: 'North Greenbush', state: 'NY', zip: '12144', country: 'USA' },
            { label: 'Shipping', line1: '66 Maple Ave', city: 'North Greenbush', state: 'NY', zip: '12144', country: 'USA' }
        ]
    },
    {
        id: 'USR-008',
        username: 'Geneva J. Silverstein',
        email: 'geneva.silverstein@example.com',
        phone: '507-406-9467',
        joiningDate: '2016-10-19',
        status: 'pending',
        addresses: [
            { label: 'Home', line1: '3421 Pritchard Court', city: 'Owatonna', state: 'MN', zip: '55060', country: 'USA' },
            { label: 'Work', line1: '19 Cedar Ave', city: 'Owatonna', state: 'MN', zip: '55060', country: 'USA' },
            { label: 'Billing', line1: '120 Austin Rd', city: 'Owatonna', state: 'MN', zip: '55060', country: 'USA' },
            { label: 'Shipping', line1: '55 Rose St', city: 'Owatonna', state: 'MN', zip: '55060', country: 'USA' }
        ]
    },
    {
        id: 'USR-009',
        username: 'Herbert C. Patton',
        email: 'herbert.patton@example.com',
        phone: '801-388-6508',
        joiningDate: '2017-07-20',
        status: 'active',
        addresses: [
            { label: 'Home', line1: '2470 Grove Street', city: 'Bethpage', state: 'NY', zip: '11714', country: 'USA' },
            { label: 'Work', line1: '10 Hempstead Rd', city: 'Bethpage', state: 'NY', zip: '11714', country: 'USA' },
            { label: 'Billing', line1: '22 Central Ave', city: 'Bethpage', state: 'NY', zip: '11714', country: 'USA' },
            { label: 'Shipping', line1: '44 Oak St', city: 'Bethpage', state: 'NY', zip: '11714', country: 'USA' }
        ]
    },
    {
        id: 'USR-010',
        username: 'James M. Henry',
        email: 'james.henry@example.com',
        phone: '951-314-6794',
        joiningDate: '2017-01-17',
        status: 'blocked',
        addresses: [
            { label: 'Home', line1: '3049 Denver Avenue', city: 'Commerce', state: 'CA', zip: '90040', country: 'USA' },
            { label: 'Work', line1: '99 Garfield Ave', city: 'Commerce', state: 'CA', zip: '90040', country: 'USA' },
            { label: 'Billing', line1: '77 Atlantic Blvd', city: 'Commerce', state: 'CA', zip: '90040', country: 'USA' },
            { label: 'Shipping', line1: '18 Washington Blvd', city: 'Commerce', state: 'CA', zip: '90040', country: 'USA' }
        ]
    }
];
