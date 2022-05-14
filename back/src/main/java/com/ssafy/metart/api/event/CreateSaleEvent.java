package com.ssafy.metart.api.event;

import java.util.Arrays;
import java.util.List;
import lombok.Getter;
import org.web3j.abi.EventEncoder;
import org.web3j.abi.FunctionReturnDecoder;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Address;
import org.web3j.abi.datatypes.Event;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.protocol.core.methods.response.Log;

@Getter
public class CreateSaleEvent {

    private Long saleId;
    private String sellerAddress;
    private Long price;

    private static final Event CREATE_SALE_EVENT = new Event(
        "CreateSale", Arrays.<TypeReference<?>>asList(
        new TypeReference<Uint256>(true) {},
        new TypeReference<Address>(true) {},
        new TypeReference<Uint256>(true) {}));

    private static final String CREATE_SALE_HASH = EventEncoder.encode(CREATE_SALE_EVENT);

    public static CreateSaleEvent getEvent(List<Log> logs) {
        CreateSaleEvent event = null;
        for (Log log: logs) {
            String eventHash = log.getTopics().get(0);

            if (eventHash.equals(CREATE_SALE_HASH)) {
                Uint256 saleId = (Uint256) FunctionReturnDecoder.decodeIndexedValue(
                    log.getTopics().get(1), new TypeReference<Uint256>() {});
                Address sellerAddress = (Address) FunctionReturnDecoder.decodeIndexedValue(
                    log.getTopics().get(2), new TypeReference<Address>() {});
                Uint256 price = (Uint256) FunctionReturnDecoder.decodeIndexedValue(
                    log.getTopics().get(3), new TypeReference<Uint256>() {});

                event = new CreateSaleEvent();
                event.saleId = saleId.getValue().longValue();
                event.sellerAddress = sellerAddress.getValue();
                event.price = price.getValue().longValue();
            }
        }

        return event;
    }
}
