const clients = [
  {
    status: 'awaiting intakes',
    client: 'alicia anderson-ek',
    noteEntries: [
      {
        client: 'alicia anderson-ek',
        timeNoteSubmitted: '9:55:48 PM',
        counselingDate: 'December 22nd, 2022',
        billed: 'no',
        _id: 1671746149015,
        notes:
          '12/22 Ann sent Intake & Credit link, 1st time Homebuyer counseling wanted',
        status: 'awaiting intakes',
        state: 'OR',
        counselor: 'gabe',
      },
    ],
  },
  {
    status: 'awaiting intakes',
    client: 'alvin l. brown',
    noteEntries: [
      {
        counselor: 'gabe',
        billed: 'no',
        notes:
          '12/22 pm recvd Credt Auth but no Intake, Ann called Cherlika and she will help her dad with Intake form.\n' +
          '12/19 Cherlika called on behalf of father Alvin Brown, sent Intro letter nad credit auth',
        counselingDate: 'December 19th, 2022',
        timeNoteSubmitted: '10:16:52 PM',
        _id: 1671747500728,
        status: 'awaiting intakes',
        state: 'CA',
        client: 'alvin l. brown',
      },
    ],
  },
  {
    status: 'awaiting intakes',
    noteEntries: [
      {
        billed: 'no',
        timeNoteSubmitted: '11:13:30 PM',
        state: 'AL',
        counselingDate: 'December 12th, 2022',
        notes:
          "12/13 sent intro letter, she called twice then once more, I sent email twice with intro. She was a bit confused, wanting program for her friend to be in a program to rent, then called back stating another friend said she'd have to put up her house and get in a program. Her friend is going to rent a room from her?  I sent her intro ltr w/MA and 3rd Party auth. was Asian but did speak English okay. Ann",
        _id: 1671750850434,
        counselor: 'gabe',
      },
    ],
    billed: 'no',
    client: 'anna pham',
  },
  {
    status: 'not counseled',
    billed: 'no',
    noteEntries: [
      {
        client: 'bethany bayenderian',
        state: 'AZ',
        billed: 'no',
        status: 'not counseled',
        counselor: 'gabe',
        timeNoteSubmitted: '9:35:22 PM',
        _id: 1670881090766,
        notes:
          '1st time homebuyer request, divorce/separation/loss of income cited\n' +
          'This person came in on day Outlook crashed 12/1, missed sending the Intake links, I have now sent out 12/12 and Credit',
        counselingDate: 'December 12th, 2022',
      },
      {
        notes:
          '1st time homebuyer request, divorce/separation/loss of income cited\n' +
          'This person came in on day Outlook crashed 12/1, missed sending the Intake links, I have now sent out 12/12 and Credit',
        state: 'AZ',
        billed: 'no',
        counselor: 'gabe',
        _id: 1670881090766,
        timeNoteSubmitted: '9:35:22 PM',
        counselingDate: 'December 12th, 2022',
      },
    ],
    client: 'bethany bayenderian',
  },
  {
    status: 'awaiting intakes',
    noteEntries: [
      {
        counselingDate: 'December 19th, 2022',
        client: 'daniela martinez',
        billed: 'no',
        state: 'CA',
        timeNoteSubmitted: '3:35:43 PM',
        notes:
          '-- From: Gabe To get started please completing the forms below.\n' +
          'If you have any questions about the program, please give me a call.',
        status: 'awaiting intakes',
        _id: 1671464551931,
        counselor: 'gabe',
      },
      {
        status: 'awaiting intakes',
        counselor: 'gabe',
        notes:
          '12/19 TG sent out intro letter for HB & credit counseling request from Flabias orig incoming email (626) 625-6856 daymartinez91@gmail.com',
        state: 'CA',
        counselingDate: '2022-12-19T08:00:00.000Z',
        billed: 'no',
        client: 'daniela martinez',
        _id: 1671749959779,
      },
    ],
    client: 'daniela martinez',
  },
  {
    billed: 'yes',
    client: 'demetria january',
    noteEntries: [
      {
        status: 'ongoing',
        billed: 'yes',
        client: 'demetria january',
        state: 'CA',
        counselingDate: 'December 12th, 2022',
        counselor: 'gabe',
        _id: 1670881183845,
        notes:
          "Today, I contacted Dimitra January's servicer, Cenlar, to inquire about the status of her payoff. Since we were given a deadline of December 12, the payment has yet to be processed, and is still awaiting to be settled by the servicer. The representative informed me that they will be forwarding it to the manager in charge to set in place payments.\n" +
          "However, Dimitra will still need to contact Lynn in order to pay off her December payment of $2516.10. There is a chance that the payment will be returned. The last note entered was that the server will almost certainly not have the correct amount submitted. I'll contact the service provider again on Friday the 16th to inquire about the payment.\n",
        timeNoteSubmitted: '9:35:22 PM',
      },
      {
        _id: 1670881183845,
        billed: 'yes',
        counselor: 'gabe',
        timeNoteSubmitted: '9:35:22 PM',
        state: 'CA',
        notes:
          "Today, I contacted Dimitra January's servicer, Cenlar, to inquire about the status of her payoff. Since we were given a deadline of December 12, the payment has yet to be processed, and is still awaiting to be settled by the servicer. The representative informed me that they will be forwarding it to the manager in charge to set in place payments.\n" +
          "However, Dimitra will still need to contact Lynn in order to pay off her December payment of $2516.10. There is a chance that the payment will be returned. The last note entered was that the server will almost certainly not have the correct amount submitted. I'll contact the service provider again on Friday the 16th to inquire about the payment.\n",
        counselingDate: 'December 12th, 2022',
      },
    ],
    status: 'ongoing',
  },
];

export default clients;
