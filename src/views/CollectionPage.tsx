import React, { useEffect } from "react";
import {
  Box,
  Center,
  Grid,
  Pagination,
  SimpleGrid,
  Text,
  MultiSelect,
  Slider,
  SegmentedControl,
  Collapse,
  Group,
  Button,
} from "@mantine/core";
import { ThugGang } from "../components/headlines/ThugGang";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InfamousData } from "../models/InfamousMap";
import { selectAllFilters, selectAllWeights } from "../redux/raritySelectors";
import { setEdition, setFilters, setWeight } from "../redux/rarityState";
import { SingleTokenOverview } from "../components/thug/SingleTokenOverview";
import {
  selectCountedAttributes,
  selectFilteredInfamousData,
  selectInfamousDataWithScore,
} from "../redux/selectors";
import { Editions } from "../models/Rarity.models";
import { fetchListings } from "../redux/listingsState";
import { BaseLayout } from "./BaseLayout";

export function CollectionPage() {
  const [activePage, setPage] = useState(1);
  const [filterOpened, setFilterOpened] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const allMetadata = useSelector(selectInfamousDataWithScore);
  const countedAttributes = useSelector(selectCountedAttributes);

  const filters = useSelector(selectAllFilters);
  const filteredItems = useSelector(selectFilteredInfamousData);

  const traitWeights = useSelector(selectAllWeights);
  const dispatch = useDispatch();
  const onWeightChange = (type: string, weight: number) =>
    dispatch(setWeight({ [type]: weight }));

  const getFinalWeight = (given: number | undefined) => {
    if (given === undefined) {
      return 100;
    }

    return given * 100;
  };

  const sortedItems = filteredItems.sort(compareRarity);

  function compare(a: InfamousData, b: InfamousData) {
    if (a.metadata.name < b.metadata.name) {
      return -1;
    }
    if (a.metadata.name > b.metadata.name) {
      return 1;
    }
    return 0;
  }

  function compareRarity(a: InfamousData, b: InfamousData) {
    if (!a.rarityScore || !b.rarityScore) {
      return 0;
    }

    if (a.rarityScore < b.rarityScore) {
      return 1;
    }
    if (a.rarityScore > b.rarityScore) {
      return -1;
    }
    return 0;
  }

  const items = sortedItems.slice(
    (activePage - 1) * itemsPerPage,
    (activePage - 1) * itemsPerPage + itemsPerPage
  );

  const handleChange = (traitType: string) => (values: string[]) => {
    // if (filter.includes(val)) {
    //   setFilter(filter.filter((it) => it !== val));
    // } else {
    //   setFilter([...filter, val]);
    // }

    dispatch(setFilters({ ...filters, [traitType]: values }));
  };

  const filterItems = Object.entries(countedAttributes).map(
    ([trait_type, valueCounter]) => {
      const options = Object.keys(valueCounter).map((value) => {
        return {
          label: value,
          value: `${trait_type}||${value}`,
        };
      });

      return (
        <Box mb={0} key={trait_type}>
          <MultiSelect
            key={trait_type}
            data={options}
            label={trait_type}
            placeholder="Please select"
            onChange={handleChange(trait_type)}
            mb={0}
          />

          {/*<Text size={"xs"}>Weight:</Text>*/}
          {/*<Slider*/}
          {/*  size={3}*/}
          {/*  value={getFinalWeight(traitWeights[trait_type])}*/}
          {/*  onChange={(value) => onWeightChange(trait_type, value / 100)}*/}
          {/*  marks={*/}
          {/*    [*/}
          {/*      // { value: 0, label: "0%" },*/}
          {/*      // { value: 25, label: "25%" },*/}
          {/*      // { value: 50, label: "50%" },*/}
          {/*      // { value: 75, label: "75%" },*/}
          {/*      // { value: 100, label: "100%" },*/}
          {/*    ]*/}
          {/*  }*/}
          {/*/>*/}
        </Box>
      );
    }
  );

  return (
    <BaseLayout>
      <Grid>
        <Grid.Col>
          <Box mb={12} mt={10} style={{ alignItems: "flex-start" }}>
            <ThugGang fill={"#ccc"} height={28} />
          </Box>
        </Grid.Col>
      </Grid>

      <Group position={"apart"} mb={15}>
        <Group spacing={15}>
          <SegmentedControl
            data={[
              { label: "Classic", value: "infamous" },
              { label: "Burnt", value: "burnt" },
            ]}
            onChange={(val) => dispatch(setEdition(val as Editions))}
          />
          <Text size={"sm"}>Showing: {filteredItems.length} thugs</Text>
        </Group>
        <Button size="xs" onClick={() => setFilterOpened(!filterOpened)}>
          {filterOpened ? "Hide Filter" : "Show Filter"}
        </Button>
      </Group>

      <Collapse in={filterOpened}>
        <SimpleGrid
          cols={3}
          mb={25}
          spacing={"sm"}
          breakpoints={[
            { maxWidth: "sm", cols: 3, spacing: "sm" },
            { maxWidth: "xs", cols: 2, spacing: "xs" },
          ]}
        >
          {filterItems}
        </SimpleGrid>
      </Collapse>

      <SimpleGrid
        cols={5}
        spacing={"sm"}
        breakpoints={[
          { maxWidth: "md", cols: 5, spacing: "sm" },
          { maxWidth: "sm", cols: 3, spacing: "sm" },
          { maxWidth: "xs", cols: 2, spacing: "xs" },
        ]}
      >
        {items.map((data) => {
          return <SingleTokenOverview key={data.token} data={data} />;
        })}
      </SimpleGrid>

      <Center my={30}>
        {filteredItems.length > 0 ? (
          <Pagination
            page={activePage}
            onChange={setPage}
            total={Math.floor(filteredItems.length / itemsPerPage) + 1}
          />
        ) : (
          <Text>Sorry bro, no thugs found!</Text>
        )}
      </Center>
    </BaseLayout>
  );
}
