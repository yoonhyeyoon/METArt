package com.ssafy.metart.api.event;

import java.util.Arrays;
import java.util.List;
import lombok.Getter;
import org.web3j.abi.EventEncoder;
import org.web3j.abi.FunctionReturnDecoder;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Address;
import org.web3j.abi.datatypes.Event;
import org.web3j.abi.datatypes.Utf8String;
import org.web3j.abi.datatypes.generated.Bytes32;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.protocol.core.methods.response.Log;

@Getter
public class CreateTokenEvent {

    private Long tokenId;
    private String tokenUri;
    private String owner;

    private static final Event CREATE_TOKEN_EVENT = new Event(
        "CreateToken", Arrays.<TypeReference<?>>asList(
        new TypeReference<Uint256>(true) {},
        new TypeReference<Utf8String>(true) {},
        new TypeReference<Address>(true) {}));

    private static final String CREATE_TOKEN_HASH = EventEncoder.encode(CREATE_TOKEN_EVENT);

    private CreateTokenEvent() {};

    public static CreateTokenEvent getEvent(List<Log> logs) {
        CreateTokenEvent event = null;
        for (Log log: logs) {
            String eventHash = log.getTopics().get(0);

            if (eventHash.equals(CREATE_TOKEN_HASH)) {
                Uint256 tokenId = (Uint256) FunctionReturnDecoder.decodeIndexedValue(
                    log.getTopics().get(1), new TypeReference<Uint256>() {});
                Bytes32 tokenUri = (Bytes32) FunctionReturnDecoder.decodeIndexedValue(
                    log.getTopics().get(2), new TypeReference<Bytes32>() {});
                Address owner = (Address) FunctionReturnDecoder.decodeIndexedValue(
                    log.getTopics().get(3), new TypeReference<Address>() {});

                event = new CreateTokenEvent();
                event.tokenId = tokenId.getValue().longValue();
                event.tokenUri = tokenUri.getValue().toString();
                event.owner = owner.getValue();
            }
        }

        return event;
    }
}
