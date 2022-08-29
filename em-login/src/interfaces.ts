// agentDisplayName: Adam Bright(ccadam)
// agentId: Object[FrameworkEVA.API.Objects.EvaId]
// channel: Offline
// channelInteractionId: null
// channelInteractionType: OfflineInteractionED
// contactId: Object[FrameworkEVA.API.Objects.EvaId]
// contactOutcomeCodeId: null
// contactTypeDisplayName: -
//     contactTypeId : null
// customerDisplayName: undefined
// direction: Offline
// directionCode: O
// endTime: Sat Feb 12 22: 18: 11 ICT 2022
// hasNoteList: false
// initialInteractionDate: null
// isAssociatedWithCustomer: true
// isDeleted: false
// isInbound: false
// startTime: Sat Feb 12 22: 17: 41 ICT 2022
interface IContactList {
    agentDisplayName?: string,
    agentId?: string | number,
    channel?: string
    channelInteractionId?: number | string
    channelInteractionType?: string
    contactId?: string,
    contactOutcomeCodeId?: string,
    contactTypeDisplayName?: string,
    contactTypeId?: string | number,
    customerDisplayName?: string,
    direction?: string,
    directionCode?: string,
    endTime?: string, //Sat Feb 12 22: 18: 11 ICT 2022
    hasNoteList?: boolean, //false
    initialInteractionDate?: string,
    isAssociatedWithCustomer?: boolean, //true
    isDeleted?: boolean, //false
    isInbound?: boolean,// false
    startTime?: string, //Sat Feb 12 22: 17: 41 ICT 2022
}

interface IMessage {
    to: string,
    action: string,
    data: string
}

interface IContactListCont {
    size?: number
}

interface Idata {
    data: string;
}