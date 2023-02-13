class UdgService {
    static url = 'http://localhost:10081/unified-data-gateway/default/graphql';
    static async findContactHistoryForCustomer() {
        console.log(UdgService.name + ': udg');
        let x = new XMLHttpRequest();
        x.open('POST', UdgService.url, true);
        x.setRequestHeader('Authorization', `OIDC_id_token ${tempSession.token}`);
        //TODO: use parameter
        let data = `
            {
            findContactHistoryForCustomer(customerRef: "CC1", startTime: "2023-01-18T00:50:00+07:00", endTime: "2023-01-18T15:52+07:00", filter: { interactionTypes: [MESSAGING]}) {
                    totalCount
                    edges {
                        node {
                            activeDuration
                            direction
                            startTime
                            endTime
                            interaction {
                                systemId
                                locale
                                ... on ConversationFragment {
                                    systemId
                                    locale
                                    conversationId
                                    subChannel
                                    entryPoint
                                    referrerUrl
                                    messages {
                                        totalCount
                                        edges {
                                            node {
                                                sentTime
                                                text
                                                type
                                                attachment {
                                                    name
                                                    fileType
                                                }
                                                sender {
                                                    ... on ChatGuest {
                                                        name
                                                    }
                                                    ... on AgentParticipant {
                                                        agent {
                                                            username
                                                            firstName
                                                            lastName
                                                        }
                                                    }
                                                    ... on ChatSystem {
                                                        name
                                                    }
                                                    ... on ChatBot {
                                                        name
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        `;
        await ha.comp.Util.AjaxSend(x, data);
        if (200 == x.status) {
            console.log(x.responseText);
        }
        else {
            console.log('error, ' + x.status);
        }
    }
}
