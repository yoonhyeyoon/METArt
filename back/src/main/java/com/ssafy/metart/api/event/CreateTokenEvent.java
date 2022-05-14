package com.ssafy.metart.api.event;

import java.util.Arrays;
import java.util.List;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.web3j.abi.EventEncoder;
import org.web3j.abi.FunctionReturnDecoder;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Address;
import org.web3j.abi.datatypes.Event;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.protocol.core.methods.response.Log;

@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class CreateTokenEvent {

    private Long tokenId;
    private String owner;

    private static final Event CREATE_TOKEN_EVENT = new Event(
        "CreateToken", Arrays.<TypeReference<?>>asList(
        new TypeReference<Uint256>(true) {},
        new TypeReference<Address>(true) {}));

    private static final String CREATE_TOKEN_HASH = EventEncoder.encode(CREATE_TOKEN_EVENT);

    public static CreateTokenEvent getEvent(List<Log> logs) {
        CreateTokenEvent event = null;
        for (Log log: logs) {
            String eventHash = log.getTopics().get(0);

            if (eventHash.equals(CREATE_TOKEN_HASH)) {
                Uint256 tokenId = (Uint256) FunctionReturnDecoder.decodeIndexedValue(
                    log.getTopics().get(1), new TypeReference<Uint256>() {});
                Address owner = (Address) FunctionReturnDecoder.decodeIndexedValue(
                    log.getTopics().get(2), new TypeReference<Address>() {});

                event = new CreateTokenEvent();
                event.tokenId = tokenId.getValue().longValue();
                event.owner = owner.getValue();
            }
        }

        return event;
    }
}
